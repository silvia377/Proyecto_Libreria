export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createBook' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'title' : IDL.Text,
            'author' : IDL.Text,
            'genre' : IDL.Text,
          }),
        ],
        [],
      ),
    'deleteBook' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'title' : IDL.Text,
              'author' : IDL.Text,
              'genre' : IDL.Text,
            }),
            'Err' : IDL.Variant({ 'BookDoesNotExist' : IDL.Text }),
          }),
        ],
        [],
      ),
    'readBookById' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'title' : IDL.Text,
              'author' : IDL.Text,
              'genre' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'readBooks' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'title' : IDL.Text,
              'author' : IDL.Text,
              'genre' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'updateBook' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'title' : IDL.Text,
              'author' : IDL.Text,
              'genre' : IDL.Text,
            }),
            'Err' : IDL.Variant({ 'BookDoesNotExist' : IDL.Text }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
