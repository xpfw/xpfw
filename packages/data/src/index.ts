import BackendClient, { IBackendClient, IUiClient } from "./client"
import useAuth, {
  AuthForm, MailField, OwnerField, PwField
} from "./components/auth"
import useCreate from "./components/create"
import useEdit from "./components/edit"
// import SharedFormList, {
//   IFormListProps, ISharedFormList, ISharedFormListState
// } from "./components/list"
import useRemove from "./components/remove"
import useShow from "./components/show"
// import RelationShipWrapper, {
//   addId, getListFormFromRelationshipField, ISharedRelationshipField,
//   ISharedRelationshipFieldProps, removeId, searchRelated
// } from "./form/relationship"
import dataOptions from "./options"
import DbStore, { REMOVE_ADDON_KEY } from "./store/db"
import ListStore from "./store/list"
import UserStore from "./store/user"

export {
  DbStore, ListStore, BackendClient, IBackendClient, IUiClient, dataOptions,
  useCreate,
  // SharedFormList, IFormListProps, ISharedFormList, ISharedFormListState,
  useEdit,
  useShow,
  useRemove,
  useAuth,
  UserStore, AuthForm, PwField, MailField, OwnerField, REMOVE_ADDON_KEY
  // RelationShipWrapper, addId, removeId, searchRelated, getListFormFromRelationshipField,
  // ISharedRelationshipFieldProps, ISharedRelationshipField
}
