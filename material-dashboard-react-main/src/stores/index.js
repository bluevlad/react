import { toJS } from "mobx";
import { MobXProviderContext, observer } from "mobx-react";
import { useContext } from "react";

// Store 클래스들 - 기본 구현
class CommonStore {}
class AuthStore {}
class MenuStore {}
class TableDndStore {}
class MyApprovalBoxStore {}
class ApprovalBatchStore {}
class FavoriteDocumentBoxStore {}
class SearchBarStore {}
class SettingManageStore {}
class RcvGroupSearchBarStore {}
class BusinessViewStore {}
class AdminStore {}
class DocumentStore {}
class BusinessTripPlanStore {}

const RootStore = {
  commonStore: new CommonStore(),
  authStore: new AuthStore(),
  menuStore: new MenuStore(),
  tableDndStore: new TableDndStore(),
  myApprovalBoxStore: new MyApprovalBoxStore(),
  approvalBatchStore: new ApprovalBatchStore(),
  favoriteDocumentBoxStore: new FavoriteDocumentBoxStore(),
  searchBarStore: new SearchBarStore(),
  settingManageStore: new SettingManageStore(),
  rcvGroupSearchBarStore: new RcvGroupSearchBarStore(),
  businessViewStore: new BusinessViewStore(),
  adminStore: new AdminStore(),
  documentStore: new DocumentStore(),
  businessTripPlanStore: new BusinessTripPlanStore(),
};

function useStores() {
  return useContext(MobXProviderContext);
}

export { RootStore };
export default useStores;
export { observer, toJS };
