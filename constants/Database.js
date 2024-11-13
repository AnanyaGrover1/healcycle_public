import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ffljesnpahgmwvadfvwf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGplc25wYWhnbXd2YWRmdndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NDc5NzYsImV4cCI6MjAzNjMyMzk3Nn0.7rKTWQfI_esw-ojoFipIc0XdXeOA8KJVpTtCgwCYWIU";

const supabase = createClient(supabaseUrl, supabaseKey);

// Month mapping
const monthMapping = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// Utility function to ensure the month is an integer
const ensureMonthIsInteger = (month) => {
  if (typeof month === "string") {
    let monthInt = parseInt(month, 10);
    if (!isNaN(monthInt)) {
      return monthInt;
    }
    monthInt = monthMapping[month];
    if (monthInt) {
      return monthInt;
    }
    throw new Error("Invalid month value");
  }
  return month;
};

// Utility function to validate symptom object
const isValidSymptom = (symptom) => {
  return (
    typeof symptom === "object" &&
    symptom !== null &&
    "id" in symptom &&
    "name" in symptom &&
    "severity" in symptom &&
    typeof symptom.id === "number" &&
    typeof symptom.name === "string" &&
    typeof symptom.severity === "number"
  );
};

// Utility function to validate and format symptoms array
const formatSymptoms = (symptoms) => {
  if (!Array.isArray(symptoms)) {
    throw new Error("Symptoms must be an array");
  }
  return symptoms.filter(isValidSymptom);
};

const insertDiary = async (
  title,
  content,
  year,
  month,
  day,
  hour,
  minute,
  monthname,
  timestamp,
  isBleeding,
  symptoms,
  userId
) => {
  if (!userId) throw new Error("User must be authenticated");
  // Ensure month is an integer
  month = ensureMonthIsInteger(month);

  // Validate and format symptoms
  const formattedSymptoms = formatSymptoms(symptoms);

  const { data, error } = await supabase.from("diary").insert([
    {
      title,
      content,
      year,
      month,
      day,
      hour,
      minute,
      monthname,
      timestamp: new Date(timestamp * 1000).toISOString(),
      is_bleeding: isBleeding,
      symptoms: formattedSymptoms,
      user_id: userId,
    },
  ]);

  if (error) throw error;
  return data;
};

const getAllDiaries = async (year, month, userId) => {
  // Ensure month is an integer
  month = ensureMonthIsInteger(month);
  const { data, error } = await supabase
    .from("diary")
    .select("*")
    .eq("year", year)
    .eq("month", month)
    .eq("user_id", userId)
    .order("timestamp", { ascending: false });

  if (error) throw error;
  return data;
};

const getDiary = async (id, userId) => {
  const { data, error } = await supabase
    .from("diary")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

const updateDiary = async (diaryId, userId, updatedData) => {
  const { data, error } = await supabase
    .from("diary")
    .update(updatedData)
    .eq("id", diaryId)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

const deleteDiaryById = async (id) => {
  const userId = supabase.auth.user()?.id;
  if (!userId) throw new Error("User must be authenticated");
  const { data, error } = await supabase
    .from("diary")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

const clearTable = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .not("id", "is", null); // This deletes all rows

  if (error) throw error;
  return data;
};

export {
  // initializeDatabase,
  insertDiary,
  getAllDiaries,
  deleteDiaryById,
  clearTable,
  getDiary,
  updateDiary,
};
