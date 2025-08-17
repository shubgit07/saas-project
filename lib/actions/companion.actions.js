'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select();

  if (error || !data) throw new Error(error?.message || 'Failed to create a companion');

  return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }) => {
  const supabase = createSupabaseClient();

  let query = supabase.from('companions').select();

  if (subject && topic) {
    query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('session_history').insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions).flat();
};

export const getUserCompanions = async (userId) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId);

  if (error) throw new Error(error.message);

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 3; // Default to 3 for basic/free users

  // Check for pro plan first (unlimited companions)
  if (has({ plan: 'pro' })) {
    return true;
  } else if (has({ plan: 'core' })) {
    limit = 10;
  } else if (has({ plan: 'basic' })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else {
    limit = 3; // Default for free users
  }

  // Debug logging to see what's happening
  console.log('Permission check:', {
    userId,
    hasProPlan: has({ plan: 'pro' }),
    hasCorePlan: has({ plan: 'core' }),
    hasBasicPlan: has({ plan: 'basic' }),
    has10Limit: has({ feature: "10_companion_limit" }),
    has3Limit: has({ feature: "3_companion_limit" }),
    assignedLimit: limit
  });

  const { data, error } = await supabase
    .from('companions')
    .select('id', { count: 'exact' })
    .eq('author', userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length || 0;

  console.log(`User has ${companionCount} companions, limit is ${limit}`);

  return companionCount < limit;
};

// Bookmarks
export const addBookmark = async (companionId, path) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page
  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId, path) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId) => {
  const supabase = createSupabaseClient();
  // Get all bookmarks for the user
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("companion_id")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  if (!bookmarks || bookmarks.length === 0) return [];
  // Fetch all companions by their IDs
  const ids = bookmarks.map(b => b.companion_id);
  const { data: companions, error: companionsError } = await supabase
    .from("companions")
    .select("*")
    .in("id", ids);
  if (companionsError) throw new Error(companionsError.message);
  return companions;
};
