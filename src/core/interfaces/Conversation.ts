export interface ConversationItem
{
    username : string;
    content : string;
    date : string;
    // children? : SidebarItem[];

}

export interface TodayConversation
{
    todayconversationitems : ConversationItem[];
    itemlimit ? : number;
}