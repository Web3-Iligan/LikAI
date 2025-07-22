export const idlFactory = ({ IDL }) => {
  const FarmStatus = IDL.Variant({
    INACTIVE: IDL.Null,
    ACTIVE: IDL.Null,
  });
  return IDL.Service({
    login: IDL.Func([IDL.Principal], [IDL.Text], ["query"]),
    register: IDL.Func([IDL.Principal, FarmStatus], [], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
