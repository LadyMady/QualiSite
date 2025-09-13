// 📁 src/lib/utils.ts
// Petite utilité pour fusionner les classes (équivalent du cn de shadcn)
export function cn(...classes: Array<string | false | null | undefined>) {
return classes.filter(Boolean).join(" ");
}