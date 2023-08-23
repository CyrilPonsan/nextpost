import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Moon, Sun, CheckCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-none"
          size="sm"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-24 p-4 border border-border bg-background rounded-lg text-xs"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <span className="w-full cursor-pointer hover:outline-none flex justify-between items-center">
              <p className="hover:font-bold">Light</p>
              {theme === "light" ? <CheckCheck className="w-4 h-4" /> : null}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:outline-none hover:font-bold"
            onClick={() => setTheme("dark")}
          >
            <span className="w-full cursor-pointer hover:outline-none flex justify-between items-center">
              <p className="hover:font-bold">Dark</p>
              {theme === "dark" ? <CheckCheck className="w-4 h-4" /> : null}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:outline-none hover:font-bold"
            onClick={() => setTheme("system")}
          >
            <span className="w-full cursor-pointer hover:outline-none flex justify-between items-center">
              <p className="hover:font-bold">System</p>
              {theme === "system" ? <CheckCheck className="w-4 h-4" /> : null}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
