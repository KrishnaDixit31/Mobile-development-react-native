import DynamicDrawerNavigator from "./src/navigators/Drawer/DynamicDrawerNavigator";
import StaticDrawerNavigator from "./src/navigators/Drawer/StaticDrawerNavigator";
import DynamicStackNavigator from "./src/navigators/Stack/DynamicStackNavigator";
import StaticStackNavigator from "./src/navigators/Stack/StaticStackNavigator";
import DynamicTabsNavigator from "./src/navigators/Tabs/DynamicTabsNavigator";
import StaticTabsNavigator from "./src/navigators/Tabs/StaticTabsNavigator";
import TabsStackCombo from "./src/navigators/Tabs/TabsStackCombo";
import TopTabDynamicNavigator from "./src/navigators/Tabs/TopTabDynamicNavigator";

export default function App() {
  return (
    // <StaticStackNavigator />
    // <DynamicStackNavigator />
    // <StaticTabsNavigator />
    // <DynamicTabsNavigator />
    // <TabsStackCombo />
    // <TopTabDynamicNavigator />
    // <StaticDrawerNavigator />
    <DynamicDrawerNavigator />
  );
}
