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