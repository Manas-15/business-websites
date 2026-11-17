import {
  Award,
  ChefHat,
  Clock,
  Coffee,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Scissors,
  Shield,
  Sparkles,
  Users,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { FeatureIconName } from "@/types/content";

const ICONS: Record<FeatureIconName, LucideIcon> = {
  chef: ChefHat,
  leaf: Leaf,
  flame: Flame,
  heart: Heart,
  coffee: Coffee,
  dumbbell: Dumbbell,
  users: Users,
  clock: Clock,
  award: Award,
  sparkles: Sparkles,
  scissors: Scissors,
  shield: Shield,
  wine: Wine,
  utensils: Utensils,
  map: MapPin,
};

export function FeatureIcon({ name, className }: { name: FeatureIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
