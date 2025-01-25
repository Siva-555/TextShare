import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarGroupAction,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";


import { Music, ChevronDown, Plus, ListVideo, Heart, ThumbsUp, Clock9, House, Flame, Album, UserRound } from "lucide-react";

const playlist = [
  {
    name: "playlist 1",
  },
  {
    name: "new songs 2",
  },
  {
    name: "playlist 3",
  },
];

const LIBRARY = [
  {
    name:"recently_played_songs",
    title: "Recently Played",
    icon: Clock9,
    url: "/recently_played_songs",
  },
  {
    name:"liked_songs",
    title: "Liked Songs",
    icon: ThumbsUp,
    url: "/liked_songs",
  },
  {
    name:"favorite_songs",
    title: "Favorite Songs",
    icon: Heart,
    url: "/favorite_songs",
  },
]

const MAIN_MENUS = [
  {
    name:"home",
    title: "Home",
    icon: House,
    url: "/home",
  },
  {
    name:"trending",
    title: "Trending",
    icon: Flame,
    url: "/trending",
  },
  {
    name:"album",
    title: "Album",
    icon: Album,
    url: "/album",
  },
  {
    name:"artist",
    title: "Artist",
    icon: UserRound,
    url: "/artist",
  },
]

function AppSidebar() {

  const onMainMenusHandler = (item)=>{
    console.log("onMain menus clicked", item)
  }
  const onLibraryHandler = (item)=>{
    console.log("onlibrary clicked", item)
  }
  const onPlaylistHandler = (item)=>{
    console.log("onplaylist clicked", item)
  }
  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem >
          <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Music className="size-4" />
              </div>
              {/* <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                Music
                </span>
                <span className="truncate text-xs">online</span>
              </div> */}
              <div className="grid flex-1 ml-2 text-xl leading-tight">
                <span className="font-semibold">Music</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Body */}
      <SidebarContent>
        {/* MAIN Menus */}
        <SidebarMenu className="p-2">
          {
            MAIN_MENUS.map((ele,ind)=>(
              <SidebarMenuItem key={`${ind}-${ele.name}`} className="" >
                <SidebarMenuButton onClick={()=>onMainMenusHandler(ele)}>
                  <ele.icon /> <span>{ele.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          }
          </SidebarMenu>
        {/* Library */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-base"> LIBRARY </SidebarGroupLabel>
            <SidebarMenu>
              {
                LIBRARY.map((ele,ind)=>(
                  <SidebarMenuItem key={`${ind}-${ele.name}`} className="" >
                    <SidebarMenuButton onClick={()=>onLibraryHandler(ele)}>
                      <ele.icon /> <span>{ele.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
        </SidebarGroup>
        {/* Playlist */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-base"> PLAYLIST </SidebarGroupLabel>
          <SidebarGroupAction title="Create a new Playlist ">
            <Plus /> <span className="sr-only">Create a new Playlist</span>
          </SidebarGroupAction>
          {playlist.length > 0 ? (
            <SidebarMenu>
              {playlist.map((item, ind) => (
                <SidebarMenuItem key={`${ind}-${item.name}`} >
                  <SidebarMenuButton onClick={()=>onPlaylistHandler(item)}>
                    <ListVideo /> <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          ) : (
            <SidebarMenu>
               <SidebarMenuItem className="text-center">
                  <span>No Playlist</span>
                </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
