"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { markAsSeen } from "@/lib/store/slices/notificationSlice";
import { cn } from "@/lib/utils";
import {
  AdminNotification,
  CashbackNotification,
  CommissionNotification,
} from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaRegBell, FaMoneyBillWave, FaHandshake } from "react-icons/fa";
import { H5, Small, XSmall } from "../typography";

const ITEMS_PER_BATCH = 6;
const LOAD_DELAY = 800;

type NotificationWithType = (
  | CashbackNotification
  | CommissionNotification
  | AdminNotification
) & {
  _type: "cashback" | "commission" | "admin";
};

const Notifications = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.notifications.admin);
  const cashback = useAppSelector((state) => state.notifications.cashback);
  const commission = useAppSelector((state) => state.notifications.commission);

  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_BATCH);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset visible items when tab changes
  useEffect(() => {
    setVisibleItems(ITEMS_PER_BATCH);
  }, [activeTab]);

  // ✅ Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          await new Promise((r) => setTimeout(r, LOAD_DELAY));
          setVisibleItems((prev) => prev + ITEMS_PER_BATCH);
          setIsLoadingMore(false);
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    // ✅ Cleanup must return a function, not `null`
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [isLoadingMore]);

  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-20 bg-muted animate-pulse rounded-lg border"
        />
      ))}
    </div>
  );

  const renderGeneralNotifications = () => {
    const notifications = admin.slice(0, visibleItems);
    
    if (!admin.length) return renderSkeleton();

    return (
      <div className="space-y-4">
        {notifications.map(({
          id,
          title,
          descriptions,
          seen,
          created_at,
        }: AdminNotification) => (
          <Card
            key={id}
            onClick={() => {
              if (seen === "0") {
                dispatch(markAsSeen({ type: "admin", id }));
              }
            }}
            className={cn(
              "transition-all cursor-pointer hover:shadow-md border p-2",
              seen === "0"
                ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600"
                : "bg-background"
            )}
          >
            <CardContent className="flex items-start gap-2 p-2">
              <FaRegBell className="text-yellow-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <H5 className="text-signature">{title}</H5>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
                    General
                  </span>
                </div>
                <Small>{descriptions}</Small>
                <div className="mt-1">
                  <XSmall className="text-muted-foreground">
                    {new Date(created_at).toLocaleString()}
                  </XSmall>
                </div>
                {seen === "0" && (
                  <XSmall className="text-yellow-700 dark:text-yellow-300">
                    Unseen
                  </XSmall>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderTransactionNotifications = () => {
    // Combine cashback and commission notifications
    const allTransactions = [
      ...cashback.map(n => ({ ...n, _type: "cashback" as const })),
      ...commission.map(n => ({ ...n, _type: "commission" as const }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const notifications = allTransactions.slice(0, visibleItems);
    
    if (!cashback.length && !commission.length) return renderSkeleton();

    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={`${notification._type}-${notification.id}`}
            onClick={() => {
              if (notification.seen === "0") {
                dispatch(markAsSeen({ type: notification._type, id: notification.id }));
              }
            }}
            className={cn(
              "transition-all cursor-pointer hover:shadow-md border p-2",
              notification.seen === "0"
                ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600"
                : "bg-background"
            )}
          >
            <CardContent className="flex items-start gap-2 p-2">
              {notification._type === "cashback" ? (
                <FaMoneyBillWave className="text-green-500 mt-1" />
              ) : (
                <FaHandshake className="text-blue-500 mt-1" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <H5 className="text-signature">{notification.title}</H5>
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    notification._type === "cashback" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  )}>
                    {notification._type === "cashback" ? "Cashback" : "Commission"}
                  </span>
                </div>
                <Small>{notification.descriptions}</Small>
                {notification._type === "cashback" && "cash_back_return" in notification && (
                  <Small className="text-green-600 dark:text-green-400 font-medium">
                    Amount: PKR {notification.cash_back_return}
                  </Small>
                )}
                {notification._type === "commission" && (
                  <div className="space-y-1 mt-1">
                    {"directCommission" in notification && notification.directCommission && (
                      <Small className="text-blue-600 dark:text-blue-400">
                        Direct: PKR {notification.directCommission}
                      </Small>
                    )}
                    {"bucketCommission" in notification && notification.bucketCommission && (
                      <Small className="text-blue-600 dark:text-blue-400">
                        Bucket: PKR {notification.bucketCommission}
                      </Small>
                    )}
                  </div>
                )}
                <XSmall className="text-muted-foreground mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </XSmall>
                {notification.seen === "0" && (
                  <XSmall className="text-yellow-700 dark:text-yellow-300">
                    Unseen
                  </XSmall>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const getTotalUnseenCount = () => {
    const adminUnseen = admin.filter(n => n.seen === "0").length;
    const cashbackUnseen = cashback.filter(n => n.seen === "0").length;
    const commissionUnseen = commission.filter(n => n.seen === "0").length;
    return adminUnseen + cashbackUnseen + commissionUnseen;
  };

  const getTabUnseenCount = (tab: string) => {
    if (tab === "general") {
      return admin.filter(n => n.seen === "0").length;
    } else {
      return cashback.filter(n => n.seen === "0").length + 
             commission.filter(n => n.seen === "0").length;
    }
  };

  const currentTabData = activeTab === "general" ? admin : [...cashback, ...commission];
  const showLoadMore = visibleItems < currentTabData.length;

  return (
    <div className="px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold">Notifications</h2>
        {getTotalUnseenCount() > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {getTotalUnseenCount()} new
          </span>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="general" className="relative">
            General
            {getTabUnseenCount("general") > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getTabUnseenCount("general")}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="transactions" className="relative">
            Earnings
            {getTabUnseenCount("transactions") > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getTabUnseenCount("transactions")}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          {renderGeneralNotifications()}
        </TabsContent>

        <TabsContent value="transactions" className="mt-0">
          {renderTransactionNotifications()}
        </TabsContent>
      </Tabs>

      {showLoadMore && (
        <div ref={observerRef} className="flex justify-center mt-6">
          <div className="h-6 w-6 border-t-2 border-l border-r-4 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Notifications;
