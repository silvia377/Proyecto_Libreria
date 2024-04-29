import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createBook' : ActorMethod<
    [string, string, string],
    { 'id' : Principal, 'title' : string, 'author' : string, 'genre' : string }
  >,
  'deleteBook' : ActorMethod<
    [string],
    {
        'Ok' : {
          'id' : Principal,
          'title' : string,
          'author' : string,
          'genre' : string,
        }
      } |
      { 'Err' : { 'BookDoesNotExist' : string } }
  >,
  'readBookById' : ActorMethod<
    [string],
    [] | [
      {
        'id' : Principal,
        'title' : string,
        'author' : string,
        'genre' : string,
      }
    ]
  >,
  'readBooks' : ActorMethod<
    [],
    Array<
      {
        'id' : Principal,
        'title' : string,
        'author' : string,
        'genre' : string,
      }
    >
  >,
  'updateBook' : ActorMethod<
    [string, string, string, string],
    {
        'Ok' : {
          'id' : Principal,
          'title' : string,
          'author' : string,
          'genre' : string,
        }
      } |
      { 'Err' : { 'BookDoesNotExist' : string } }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
