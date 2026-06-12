import Config from 'react-native-config';
import { Freshchat, FreshchatConfig, FreshchatUser, ConversationOptions } from 'react-native-freshchat-sdk';


const FRESHCHAT_APPI_ID = Config.FRESHCHAT_APPI_ID
const FRESHCHAT_APP_KEY = Config.FRESHCHAT_APP_KEY


const freshchatConfig = new FreshchatConfig(FRESHCHAT_APPI_ID, FRESHCHAT_APP_KEY);

const initFreshChat = () => {
    try {
        Freshchat.init(freshchatConfig);
        console.log("freshchat suceess ===>");

    } catch (error) {
        console.log("freshchat error ===>", error);

    }

}
const SetFreshChatUserInfo = (user: any) => {
    var freshchatUser = new FreshchatUser();
    freshchatUser.firstName = user?.name;
    freshchatUser.email = user?.email;
    freshchatUser.phoneCountryCode = "+965";
    freshchatUser.phone = user?.phone;;
    Freshchat.setUser(freshchatUser, (error) => {
        console.log(error);
    });
}

const conversationOptions = new ConversationOptions();
conversationOptions.tags = ["Yamak-Mobile"];
conversationOptions.filteredViewTitle = "Premium Support";



export {
    initFreshChat,
    Freshchat,
    SetFreshChatUserInfo,
    conversationOptions
}