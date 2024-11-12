// Get profile info
export interface UserProfileData {
    email: string,
    height?: number,
    desired_weight?: number,
    current_weight?: number,
    age?: number,
    gender?: string,
    daily_activity?: string,
    weight_goal?: string,
    weight_change_goal?: number
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