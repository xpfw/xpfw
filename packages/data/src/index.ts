import BackendClient, { IBackendClient, IUiClient } from "./client"
import useAuth, {
  AuthForm, MailField, OwnerField, PwField
} from "./hooks/auth"
import useCreate, { ICreateHookProps, useCreateWithProps } from "./hooks/create"
import useEdit, { IEditHookProps, useEditWithProps } from "./hooks/edit"
import useList, { IListHookProps, useListWithProps } from "./hooks/list"
import useRelationship, {
  addId, displayModeChanger, getListFormFromRelationshipField, IRelationshipHookProps,
  removeId, searchRelated, useRelationshipWithProps
} from "./hooks/relationship"
import useRemove, { IRemoveHookProps, useRemoveWithProps } from "./hooks/remove"
import useGet, { IGetHookProps, useGetWithProps } from "./hooks/show"
import dataOptions from "./options"
import DbStore, { REMOVE_ADDON_KEY } from "./store/db"
import ListStore from "./store/list"
import UserStore from "./store/user"
import toJS from "./util/toJS"
import valToRegex, { changeValToRegex } from "./util/valToRegex";

export {
  DbStore, ListStore, BackendClient, IBackendClient, IUiClient, dataOptions,
  useCreate, useCreateWithProps, ICreateHookProps,
  useList, useListWithProps, IListHookProps,
  useEdit, useEditWithProps, IEditHookProps,
  useGet, useGetWithProps, IGetHookProps,
  useRemove, useRemoveWithProps, IRemoveHookProps,
  useAuth, useRelationship, toJS, valToRegex, changeValToRegex,
  UserStore, AuthForm, PwField, MailField, OwnerField, REMOVE_ADDON_KEY,
  addId, displayModeChanger, getListFormFromRelationshipField, IRelationshipHookProps,
  removeId, searchRelated, useRelationshipWithProps
}
