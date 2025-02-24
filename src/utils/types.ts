
import { ScreenNames } from "./screenNames";

export interface CustomContact {
  lastMessageType: string;
  lastMessage: ReactNode;
  id: string;
  name: string;
  phoneNumber: number;
  profileImg: string;
  color: string;
}

export type RootStackParamList = {
    [ScreenNames.Home]: undefined;
    [ScreenNames.Signin]: undefined;
    [ScreenNames.Signup]: undefined;
    [ScreenNames.Add]: undefined;
    [ScreenNames.BottomTab]:undefined;
    [ScreenNames.Category]:undefined;
    [ScreenNames.Details]:undefined;
    [ScreenNames.Notify]:undefined;
    [ScreenNames.Profile]:undefined;
    [ScreenNames.Save]:undefined;
    
    [ScreenNames.Setting]:undefined;
    [ScreenNames.GroupChat]:undefined;
    [ScreenNames.Splash]:undefined;
    [ScreenNames.Login]:undefined;
    [ScreenNames.Tutorial]:undefined;
    [ScreenNames.Otp]:undefined;
    [ScreenNames.Post]:undefined;
    [ScreenNames.Scanner]:undefined;
    [ScreenNames.UserChat]: { 
      selectedUser?: CustomContact; 
    };
    
    [ScreenNames.Search]: { contacts: CustomContact[] };  
    [ScreenNames.Chat]: { roomId: string; selectedUser: CustomContact }; 
    [ScreenNames.GroupChatting]: { roomId: string }; 
  };