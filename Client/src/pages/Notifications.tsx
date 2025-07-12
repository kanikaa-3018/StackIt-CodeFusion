import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Check, 
  X, 
  MessageSquare, 
  ThumbsUp, 
  Trophy,
  UserPlus,
  Heart,
  CheckCheck
} from "lucide-react";

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'answer',
      title: 'New answer on your question',
      message: 'ReactMaster answered your question about React authentication',
      user: {
        name: 'ReactMaster',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
      },
      timestamp: '2 minutes ago',
      read: false,
      link: '/questions/1'
    },
    {
      id: 2,
      type: 'vote',
      title: 'Your answer was upvoted',
      message: 'Someone upvoted your answer about TypeScript interfaces',
      user: {
        name: 'DevExpert',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
      },
      timestamp: '1 hour ago',
      read: false,
      link: '/questions/2'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on your answer',
      message: 'CodeNewbie23 commented: "This really helped me understand!"',
      user: {
        name: 'CodeNewbie23',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
      },
      timestamp: '3 hours ago',
      read: true,
      link: '/questions/3'
    },
    {
      id: 4,
      type: 'badge',
      title: 'You earned a new badge!',
      message: 'Congratulations! You earned the "Helpful" badge for 5 upvoted answers.',
      timestamp: '1 day ago',
      read: true,
      badge: 'Helpful'
    },
    {
      id: 5,
      type: 'follow',
      title: 'New follower',
      message: 'PythonGuru started following you',
      user: {
        name: 'PythonGuru',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4'
      },
      timestamp: '2 days ago',
      read: true,
      link: '/users/pythonguru'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
      case 'comment':
        return <MessageSquare className="w-4 h-4" />;
      case 'vote':
        return <ThumbsUp className="w-4 h-4" />;
      case 'badge':
        return <Trophy className="w-4 h-4" />;
      case 'follow':
        return <UserPlus className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'answer':
      case 'comment':
        return 'bg-blue-500';
      case 'vote':
        return 'bg-green-500';
      case 'badge':
        return 'bg-yellow-500';
      case 'follow':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications read",
      description: "All notifications have been marked as read.",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "Notification has been removed.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const readNotifications = notifications.filter(n => n.read);
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your community interactions
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button 
            onClick={markAllAsRead}
            className="rounded-full"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{readNotifications.length}</div>
            <div className="text-sm text-muted-foreground">Read</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{notifications.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readNotifications.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                      
                      {notification.user && (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback className="text-xs">
                            {notification.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      {notification.badge && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {notification.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="w-8 h-8"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      className="w-8 h-8 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-3">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  You have no unread notifications.
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <Card key={notification.id} className="border-l-4 border-l-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                        
                        {notification.user && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback className="text-xs">
                              {notification.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="w-8 h-8"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                        className="w-8 h-8 text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="read" className="space-y-3">
          {readNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">No read notifications</h3>
                <p className="text-muted-foreground">
                  Read notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            readNotifications.map((notification) => (
              <Card key={notification.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                        
                        {notification.user && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback className="text-xs">
                              {notification.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        {notification.badge && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {notification.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      className="w-8 h-8 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
