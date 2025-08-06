export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  bio?: string;
  birth_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: number;
  player1: User;
  player2: User;
  winner?: User;
  status: 'waiting' | 'in_progress' | 'finished' | 'cancelled';
  game_type: 'classic' | 'blitz' | 'bullet';
  time_control: number;
  increment: number;
  started_at?: string;
  finished_at?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

export interface Move {
  id: number;
  match: number;
  player: User;
  move_notation: string;
  move_number: number;
  time_taken: number;
  board_state: string;
  created_at: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: 'games' | 'wins' | 'streaks' | 'time' | 'special';
  condition_type: 'games_played' | 'games_won' | 'win_streak' | 'time_played' | 'special_condition';
  condition_value: number;
  points: number;
  is_active: boolean;
  created_at: string;
}

export interface UserAchievement {
  id: number;
  user: User;
  achievement: Achievement;
  earned_at: string;
  progress: number;
}

export interface Championship {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  entry_fee: number;
  prize_pool: number;
  status: 'upcoming' | 'registration_open' | 'in_progress' | 'finished' | 'cancelled';
  tournament_type: 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss';
  time_control: number;
  increment: number;
  created_by: User;
  created_at: string;
  updated_at: string;
}

export interface ChampionshipParticipant {
  id: number;
  championship: Championship;
  user: User;
  seed: number;
  current_round: number;
  is_eliminated: boolean;
  final_position?: number;
  prize_won?: number;
  registered_at: string;
}

export interface ChampionshipMatch {
  id: number;
  championship: Championship;
  match: Match;
  round_number: number;
  match_number: number;
  participant1: ChampionshipParticipant;
  participant2: ChampionshipParticipant;
  winner?: ChampionshipParticipant;
  scheduled_time?: string;
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  display_name: string;
}