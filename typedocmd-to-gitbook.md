Adjust links with regex

\(.*?#(.*?)\)

(#$1)

Remove defined in with

\*Defined.*?\*

to rewrite:
remove isNil and replace with != / == null => !isNil\((.*?)\) $1 != null
matchStoreState\((.*?), (.*?)\) => expect(toJS($1)).toMatchSnapshot($2)