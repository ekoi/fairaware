export interface StepProps {
    id: string;
    name: string;
    description?: string;
    status: "upcoming" | "current" | "complete";
    color: "dark_blue" | "blue" | "light_blue" | "yellow";
}