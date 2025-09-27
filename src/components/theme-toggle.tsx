"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const value = theme === "system" ? "system" : theme ?? "system";

  return (
    <div className="flex items-center gap-2">
      {/* Mobile: compact icon button cycles System → Light → Dark */}
      <button
        className="lg:hidden inline-flex items-center justify-center size-8 md:size-9 rounded-md transition-colors text-foreground hover:text-signature"
        aria-label="Toggle theme"
        onClick={() => {
          const order = ["system", "light", "dark"] as const;
          const idx = order.indexOf(value as any);
          const next = order[(idx + 1) % order.length];
          setTheme(next);
        }}
      >
        {value === "light" && <Sun className="size-4" />}
        {value === "dark" && <Moon className="size-4" />}
        {value === "system" && <SunMoon className="size-4" />}
      </button>

      {/* Desktop: full select */}
      <div className="hidden lg:block">
        <Select value={value} onValueChange={(v) => setTheme(v)}>
          <SelectTrigger size="sm" aria-label="Select theme">
            <SelectValue>
              <div className="flex items-center gap-2">
                {value === "light" && <Sun className="size-4" />}
                {value === "dark" && <Moon className="size-4" />}
                {value === "system" && <SunMoon className="size-4" />}
                <span className="capitalize">{value}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">
              <div className="flex items-center gap-2"><SunMoon className="size-4" /> System</div>
            </SelectItem>
            <SelectItem value="light">
              <div className="flex items-center gap-2"><Sun className="size-4" /> Light</div>
            </SelectItem>
            <SelectItem value="dark">
              <div className="flex items-center gap-2"><Moon className="size-4" /> Dark</div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}