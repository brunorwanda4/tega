"use client";
import { ClockIcon, TrendingUpIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchBox from "@/components/common/form/search-box";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  dashboardSearchItems,
  type dashboardSearchItemType,
} from "./dashboard-search-items";

interface SearchHistoryItem {
  label: string;
  href: string;
  timestamp: number;
}

const STORAGE_KEY = "search_history";
const MAX_HISTORY_ITEMS = 4;

const DashboardSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSearchHistory(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to load search history:", error);
    }
  }, []);

  // ⌘+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveToHistory = (page: dashboardSearchItemType) => {
    try {
      const newItem: SearchHistoryItem = {
        label: page.label,
        href: page.href,
        timestamp: Date.now(),
      };
      const filtered = searchHistory.filter((item) => item.href !== page.href);
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      setSearchHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  const removeFromHistory = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = searchHistory.filter((item) => item.href !== href);
      setSearchHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to remove from history:", error);
    }
  };

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return dashboardSearchItems;
    const query = searchQuery.toLowerCase();
    return dashboardSearchItems.filter(
      (page) =>
        page.label.toLowerCase().includes(query) ||
        page.description?.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const groupedPages = useMemo(() => {
    const groups: Record<string, dashboardSearchItemType[]> = {};
    filteredPages.forEach((page) => {
      if (!groups[page.category]) groups[page.category] = [];
      groups[page.category].push(page);
    });
    return groups;
  }, [filteredPages]);

  const suggestedPages = useMemo(() => dashboardSearchItems.slice(0, 4), []);

  const handleLinkClick = (page: dashboardSearchItemType) => {
    saveToHistory(page);
    setIsOpen(false);
    setSearchQuery("");
  };

  const showEmptyState = !searchQuery.trim();

  return (
    <>
      {/* Trigger Input — click or focus opens the dialog */}
      <button
        type="button"
        className="relative w-70  cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FiSearch size={20} className="absolute left-2 top-3 text-neutral" />
        <Input
          className="pl-8 cursor-pointer"
          placeholder="Search...."
          readOnly
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute right-2 top-4 text-xs opacity-50">⌘ + K</div>
      </button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-2xl max-h-[95vh] min-h-80"
        >
          <div className="flex flex-col gap-4">
            <SearchBox autoFocus onSearch={setSearchQuery} />

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(95vh-120px)]">
              {showEmptyState ? (
                <div className="flex flex-col gap-6">
                  {/* Recent Searches */}
                  {searchHistory.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Label className="opacity-80 text-sm font-semibold flex items-center gap-2">
                          <ClockIcon size={16} />
                          Recent Searches
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearHistory}
                          className="text-xs opacity-60 hover:opacity-100"
                        >
                          Clear all
                        </Button>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        {searchHistory.map((item) => (
                          <Link
                            key={item.href}
                            href={`/${item.href}`}
                            onClick={() =>
                              handleLinkClick({
                                label: item.label,
                                href: item.href,
                                category: "",
                              })
                            }
                            className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors flex items-center justify-between w-full"
                          >
                            <div className="flex items-center gap-2">
                              <ClockIcon
                                size={16}
                                className="opacity-40 flex-shrink-0"
                              />
                              <span className="font-medium group-hover/page:text-primary duration-150">
                                {item.label}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => removeFromHistory(item.href, e)}
                              className="opacity-0 group-hover/page:opacity-60 hover:!opacity-100 transition-opacity"
                            >
                              <XIcon size={14} />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Pages */}
                  <div className="flex flex-col gap-2">
                    <Label className="opacity-80 text-sm font-semibold flex items-center gap-2">
                      <TrendingUpIcon size={16} />
                      Suggested Pages
                    </Label>
                    <div className="flex flex-col gap-1">
                      {suggestedPages.map((page) => (
                        <Link
                          key={page.href}
                          href={`${page.href}`}
                          onClick={() => handleLinkClick(page)}
                          className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium group-hover/page:text-primary duration-150">
                              {page.label}
                            </span>
                            {page.description && (
                              <span className="text-sm opacity-70">
                                {page.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredPages.length === 0 ? (
                <div className="text-center py-8 opacity-60">
                  <p>No pages found matching "{searchQuery}"</p>
                </div>
              ) : (
                Object.entries(groupedPages).map(([category, pages]) => (
                  <div key={category} className="flex flex-col gap-2">
                    <Label className="opacity-80 text-sm font-semibold">
                      {category}
                    </Label>
                    <div className="flex flex-col gap-1">
                      {pages.map((page) => (
                        <Link
                          key={page.href}
                          href={`${page.href}`}
                          onClick={() => handleLinkClick(page)}
                          className="group/page p-2 rounded-[var(--radius-box)] hover:bg-base-200 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium group-hover/page:text-primary duration-150">
                              {page.label}
                            </span>
                            {page.description && (
                              <span className="text-sm opacity-70">
                                {page.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardSearch;
