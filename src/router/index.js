import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import SuccessfullyScreen from '../screens/SuccessfullyScreen';
// MainTab
import BottomTabNavigator from './bottomNavigator.routes';
// Home
// Search
import SpecializationScreen from '../screens/SpecializationScreen';
import FilterJobPostScreen from '../screens/FilterJobPostScreen';
import SuggestedJobPostScreen from '../screens/SuggestedJobPostScreen';
import MainJobPostScreen from '../screens/MainJobPostScreen';
import JobPostDetailScreen from '../screens/JobPostDetailScreen';
import CompanyDetailScreen from '../screens/CompanyDetailScreen';

import MainCompanyScreen from '../screens/MainCompanyScreen';
import ApplyScreen from '../screens/ApplyScreen';

// Notification
import JobPostNotificationScreen from '../screens/JobPostNotificationScreen';
import AddOrEditJobPostNotificationScreen from '../screens/AddOrEditJobPostNotificationScreen';

// Chat
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';

// Profile
import OnlineProfileScreen from '../screens/OnlineProfileScreen';
import AttachedProfileScreen from '../screens/AttachedProfileScreen';
import MyJobScreen from '../screens/MyJobScreen';
import MyCompanyScreen from '../screens/MyCompanyScreen';

import EditPersonalProfileScreen from '../screens/EditPersonalProfileScreen';
import EditGeneralProfileScreen from '../screens/EditGeneralProfileScreen';
import AddOrEditExperienceScreen from '../screens/AddOrEditExperienceScreen';
import AddOrEditEducationScreen from '../screens/AddOrEditEducationScreen';
import AddOrEditCertificateScreen from '../screens/AddOrEditCertificateScreen';
import AddOrEditLanguageSkillScreen from '../screens/AddOrEditLanguageSkillScreen';
import AddOrEditAdvancedSkillScreen from '../screens/AddOrEditAdvancedSkillScreen';
import UploadProfileScreen from '../screens/UploadProfileScreen';
import EditCvScreen from '../screens/EditCvScreen/EditCvScreen';
import EditAccountScreen from '../screens/EditAccountScreen';

import SettingScreen from '../screens/SettingScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
// Map
import MapScreen from '../screens/MapScreen';
import JobPostAroundScreen from '../screens/JobPostAroundScreen';
import SearchJobPostAroundScreen from '../screens/SearchJobPostAroundScreen';

// Tool
import ViewPdfScreen from '../screens/ViewPdfScreen';

// Provider
import ChatProvider from '../context/ChatProvider';

const RootStack = createNativeStackNavigator();

const Router = () => {
  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <ChatProvider>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}>
        {!isAuthenticated && (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <RootStack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <RootStack.Screen name="CheckEmail" component={CheckEmailScreen} />
            <RootStack.Screen
              name="Successfully"
              component={SuccessfullyScreen}
            />
            <RootStack.Screen name="Splash" component={SplashScreen} />
          </>
        )}

        {/* Start: Navigator */}
        <RootStack.Screen name="MainTab" component={BottomTabNavigator} />
        {/* End: Navigator */}

        <RootStack.Group
          screenOptions={{
            headerShown: true,
            headerTintColor: '#514A6B',
          }}>
          {/* Start: Home */}
          <RootStack.Group></RootStack.Group>
          {/* End: Home */}

          {/* Start: Search */}
          <RootStack.Group>
            <RootStack.Screen
              name="SpecializationScreen"
              options={{
                headerTitle: 'Ngành nghề',
              }}
              component={SpecializationScreen}
            />
            <RootStack.Screen
              name="FilterJobPostScreen"
              component={FilterJobPostScreen}
            />
            <RootStack.Screen
              name="SuggestedJobPostScreen"
              component={SuggestedJobPostScreen}
            />
            <RootStack.Screen
              name="MainJobPostScreen"
              component={MainJobPostScreen}
            />
            <RootStack.Screen
              name="JobPostDetailScreen"
              component={JobPostDetailScreen}
              initialParams={{
                isApplySucess: false,
              }}
              options={{
                title: 'Chi tiết việc làm',
              }}
            />
            <RootStack.Screen
              name="CompanyDetailScreen"
              component={CompanyDetailScreen}
              options={{
                title: 'Chi tiết công ty',
              }}
            />
            <RootStack.Screen
              name="MainCompanyScreen"
              component={MainCompanyScreen}
            />
            <RootStack.Screen
              name="ApplyScreen"
              component={ApplyScreen}
              options={{
                title: 'Ứng tuyển công việc',
              }}
            />
          </RootStack.Group>
          {/* End: Search */}

          {/* Start: Notification */}

          <RootStack.Group
            screenOptions={{
              headerTransparent: true,
            }}>
            <RootStack.Screen
              name="JobPostNotificationScreen"
              component={JobPostNotificationScreen}
            />
            <RootStack.Screen
              name="AddOrEditJobPostNotificationScreen"
              component={AddOrEditJobPostNotificationScreen}
            />
          </RootStack.Group>

          {/* End: Notification */}

          {/* Start: Chat */}
          <RootStack.Group>
            <RootStack.Screen
              name="ChatRoomsScreen"
              component={ChatRoomsScreen}
              options={{
                title: 'MyJob Connect',
              }}
            />
            <RootStack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{
                title: '',
              }}
            />
          </RootStack.Group>
          {/* End: Chat */}

          {/* Start: Profile */}
          <RootStack.Group
            screenOptions={{
              title: '',
              headerTransparent: true,
            }}>
            <RootStack.Screen
              name="OnlineProfileScreen"
              component={OnlineProfileScreen}
              options={{
                title: 'Hồ sơ Online',
              }}
            />
            <RootStack.Screen
              name="AttachedProfileScreen"
              component={AttachedProfileScreen}
              options={{
                title: 'Hồ sơ đính kèm',
              }}
            />
            <RootStack.Screen
              name="MyJobScreen"
              component={MyJobScreen}
              options={{
                title: 'Việc làm của tôi',
              }}
              initialParams={{tabIndex: 0}}
            />
            <RootStack.Screen
              name="MyCompanyScreen"
              component={MyCompanyScreen}
              options={{
                title: 'Công ty của tôi',
              }}
              initialParams={{tabIndex: 0}}
            />

            <RootStack.Screen
              name="EditPersonalProfileScreen"
              component={EditPersonalProfileScreen}
            />
            <RootStack.Screen
              name="EditGeneralProfileScreen"
              component={EditGeneralProfileScreen}
            />
            <RootStack.Screen
              name="AddOrEditExperienceScreen"
              component={AddOrEditExperienceScreen}
            />
            <RootStack.Screen
              name="AddOrEditEducationScreen"
              component={AddOrEditEducationScreen}
            />
            <RootStack.Screen
              name="AddOrEditCertificateScreen"
              component={AddOrEditCertificateScreen}
            />
            <RootStack.Screen
              name="AddOrEditLanguageSkillScreen"
              component={AddOrEditLanguageSkillScreen}
            />
            <RootStack.Screen
              name="AddOrEditAdvancedSkillScreen"
              component={AddOrEditAdvancedSkillScreen}
            />

            <RootStack.Screen
              name="UploadProfileScreen"
              component={UploadProfileScreen}
              options={{
                title: 'Tải CV lên',
              }}
            />
            <RootStack.Screen name="EditCvScreen" component={EditCvScreen} />
            <RootStack.Screen
              name="EditAccountScreen"
              component={EditAccountScreen}
              options={{
                title: 'Tài khoản',
              }}
            />

            <RootStack.Screen
              name="SettingScreen"
              component={SettingScreen}
              options={{
                title: 'Cài đặt',
              }}
            />
            <RootStack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
              options={{
                title: 'Đổi mật khẩu',
              }}
            />
            <RootStack.Screen
              name="TermsOfUseScreen"
              component={TermsOfUseScreen}
              options={{
                title: 'Điều khoản và dịch vụ',
              }}
            />
            <RootStack.Screen
              name="PrivacyPolicyScreen"
              component={PrivacyPolicyScreen}
              options={{
                title: 'Chính sách bảo mật',
              }}
            />
            <RootStack.Screen
              name="ContactUsScreen"
              component={ContactUsScreen}
              options={{
                title: 'Về MyJob',
              }}
            />
          </RootStack.Group>
          {/* End: Profile */}

          {/* Start: Map */}
          <RootStack.Group>
            <RootStack.Screen name="MapScreen" component={MapScreen} />
            <RootStack.Screen
              name="JobPostAroundScreen"
              component={JobPostAroundScreen}
            />
            <RootStack.Screen
              name="SearchJobPostAroundScreen"
              component={SearchJobPostAroundScreen}
              options={{
                headerTransparent: true,
                title: 'Tìm kiếm nâng cao',
              }}
            />
          </RootStack.Group>
          {/* End: Map */}

          {/* Start: Tool */}
          <RootStack.Group>
            <RootStack.Screen
              name="ViewPdfScreen"
              component={ViewPdfScreen}
              options={{
                title: 'Xem tệp',
              }}
            />
          </RootStack.Group>
          {/* End: Tool */}
        </RootStack.Group>
      </RootStack.Navigator>
    </ChatProvider>
  );
};

export default Router;
