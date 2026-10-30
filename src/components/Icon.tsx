import {
  BadgeCheck, Building2, Calendar, Car, Church, CloudRain, Clock, Fence, Flag, Hammer, Heart, House, Lamp, Layers,
  Lock, MapPin, Mic, Mountain, Music, Palette, Phone, Ruler, Shield, Smartphone, Snowflake, Sparkles, Store, Sun,
  Sunset, Trees, Users, Wind, Wrench, Zap, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/types";

const map: Record<IconName, LucideIcon> = {
  smartphone: Smartphone, palette: Palette, clock: Clock, sunset: Sunset, layers: Layers, mic: Mic, sun: Sun,
  zap: Zap, shield: Shield, wrench: Wrench, users: Users, music: Music, home: House, building: Building2,
  store: Store, car: Car, trees: Trees, fence: Fence, lamp: Lamp, sparkles: Sparkles, lock: Lock,
  mountain: Mountain, wind: Wind, "cloud-rain": CloudRain, snowflake: Snowflake, calendar: Calendar,
  "map-pin": MapPin, "badge-check": BadgeCheck, ruler: Ruler, hammer: Hammer, phone: Phone, heart: Heart,
  flag: Flag, church: Church,
};

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const C = map[name] ?? Sparkles;
  return <C className={className} aria-hidden="true" strokeWidth={1.75} />;
}
