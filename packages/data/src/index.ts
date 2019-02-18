import BackendClient, { IBackendClient, IUiClient } from "./client"
import useAuth, {
  AuthForm, MailField, OwnerField, PwField
} from "./hooks/auth"
import useCreate, { ICreateHookProps, useCreateWithProps } from "./hooks/create"
import useEdit, { IEditHookProps, useEditWithProps } from "./hooks/edit"
// import SharedFormList, {
//   IFormListProps, ISharedFormList, ISharedFormListState
// } from "./hooks/list"
import useRemove, { IRemoveHookProps, useRemoveWithProps } from "./hooks/remove"
import useGet, { IGetHookProps, useGetWithProps } from "./hooks/show"
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
  useCreate, useCreateWithProps, ICreateHookProps,
  // SharedFormList, IFormListProps, ISharedFormList, ISharedFormListState,
  useEdit, useEditWithProps, IEditHookProps,
  useGet, useGetWithProps, IGetHookProps,
  useRemove, useRemoveWithProps, IRemoveHookProps,
  useAuth,
  UserStore, AuthForm, PwField, MailField, OwnerField, REMOVE_ADDON_KEY
  // RelationShipWrapper, addId, removeId, searchRelated, getListFormFromRelationshipField,
  // ISharedRelationshipFieldProps, ISharedRelationshipField
}
