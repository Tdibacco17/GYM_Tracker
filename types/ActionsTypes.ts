// Get profile info
export interface UserProfileData {
    height: number | null,
    desired_weight: number | null,
    current_weight: number | null,
    age: number | null,
    gender: GenerType | null,
    daily_activity: DailyActivityType | null,
    weight_goal: WeightGoalType | null,
    weight_change_goal: number | null
}

export type GenerType = "male" | "female" | "other"
export type DailyActivityType = "sedentary" | "lightly_active" | "moderately_active" | "very_active";
export type WeightGoalType = "gain" | "lose";

// Update profile info
export interface AccountData {
    currentWeight: number | null;
    desiredWeight: number | null;
    height: number | null;
    age: number | null;
    gender: GenerType | null;
    dailyActivity: DailyActivityType | null;
    weightGoal: WeightGoalType | null,
    weightChangeGoal: number | null
}

// New routine
export interface NewRoutineData {
    id: string;
    name: string;
    user_id: string,
    created_at: string;
}

// Get routines 
export interface UserRoutinesData {
    id: string;
    name: string;
    created_at: string;
}

// Post new exercise
export interface NewExerciseData {
    routineId: string,
    name: string;
    repetitions: number;
    repetitionsType: RepetitionsType,
    weight: number;
    weightType: WeightType,
}

export type RepetitionsType = "unilateral" | "bilateral"
export type WeightType = "per_side" | "total"

// Get ExcerciseData
export interface ExcerciseData {
    id: string,
    name: string;
    repetitions: number;
    weight: number;
    repetitions_type: RepetitionsType | null,
    weight_type: WeightType | null,
}

// Update Values Excercise
export interface UpdateValuesExercise {
    repetitions: number | null;
    weight: number | null;
    // repetitions_type: string | null,
    // weight_type: string | null,
}

// Resputa sin data
export interface ApiResponseInterface {
    message: string,
    status: number,
}

// Resputa con data
export interface ApiDataResponseInterface extends ApiResponseInterface {
    data?: any | null
}