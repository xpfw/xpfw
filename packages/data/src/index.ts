import { ValidationRegistry } from "@xpfw/validate"
import BackendClient, { IBackendClient } from "./client"
import SharedFormAuth, {
  AuthForm, IFormAuthProps, ISharedFormAuth, ISharedFormAuthState, MailField, OwnerField, PwField
} from "./components/auth"
import SharedFormCreate, {
  IFormCreateProps, ISharedFormCreate, ISharedFormCreateState, SubmitCreate
} from "./components/create"
import SharedFormEdit, {
  IFormEditProps, ISharedFormEdit, ISharedFormEditState
} from "./components/edit"
import SharedFormList, {
  IFormListProps, ISharedFormList, ISharedFormListState
} from "./components/list"
import SharedFormRemove, {
  IFormRemoveProps, ISharedFormRemove, ISharedFormRemoveState
} from "./components/remove"
import SharedFormShow, {
  IFormShowProps, ISharedFormShow, ISharedFormShowState
} from "./components/show"
import RelationShipWrapper, {
  addId, getListFormFromRelationshipField, ISharedRelationshipField,
  ISharedRelationshipFieldProps, removeId, searchRelated
} from "./form/relationship"
import DbStore, { REMOVE_ADDON_KEY } from "./store/db"
import ListStore from "./store/list"
import UserStore from "./store/user"

ValidationRegistry.registerForm(AuthForm)

export {
  DbStore, ListStore, BackendClient, IBackendClient,
  SharedFormCreate, ISharedFormCreate, ISharedFormCreateState, IFormCreateProps, SubmitCreate,
  SharedFormList, IFormListProps, ISharedFormList, ISharedFormListState,
  SharedFormEdit, IFormEditProps, ISharedFormEdit, ISharedFormEditState,
  SharedFormShow, IFormShowProps, ISharedFormShow, ISharedFormShowState,
  SharedFormRemove, IFormRemoveProps, ISharedFormRemove, ISharedFormRemoveState,
  SharedFormAuth, IFormAuthProps, ISharedFormAuth, ISharedFormAuthState,
  UserStore, AuthForm, PwField, MailField, OwnerField,
  RelationShipWrapper, addId, removeId, searchRelated, getListFormFromRelationshipField,
  ISharedRelationshipFieldProps, ISharedRelationshipField, REMOVE_ADDON_KEY
}
