// Get profile info
export interface UserProfileData {
    height: number | null,
    desired_weight: number | null,
    current_weight: number | null,
    age: number | null,
    gender: string | null,
    daily_activity: string | null,
    weight_goal: string | null,
    weight_change_goal: number | null
}

// Update profile info
export interface AccountData {
    currentWeight: number | null;
    desiredWeight: number | null;
    height: number | null;
    age: number | null;
    gender: string | null;
    dailyActivity: string | null;
    weightGoal: string | null,
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
    weight: number;
}

// Get ExcerciseData
export interface ExcerciseData {
    id: string,
    name: string;
    repetitions: number;
    weight: number;
}

// Update Values Excercise
export interface UpdateValuesExercise {
    repetitions: number | null;
    weight: number | null
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