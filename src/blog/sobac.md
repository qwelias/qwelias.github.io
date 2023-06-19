## Scoped Owner Based Access Control
### Key points
- System data entities consist of resources, and users which are able to act upon resources
- Every entity has a list of owners
- Every user has a list of scopes
- A scope is defined as `prefix/id/action/namespace`, where
  - `prefix` is a static prefix, could be useful in future to avoid conflicts with extensions
  - `id` is an ID of entity owner
  - `action` is a specific action allowed to perform (read, write, list, edit, etc. depeding on business-logic)
  - `namespace` is entity type name to perform the `action` on
  - each of those can be `any`, specific value works as a subset of `any`

### User logic
- When creating an entity it inherits the list of owners of current user, plus current user
- It is not possible to create ownership loops (if A is owned by B, then B cannot own A)
- It is possible to grant scopes which are a subset of own scopes

### Example use cases
#### Ownership transfer
1. Create user A
1. Grant A all possible scopes
1. Add user A as owner to all owned entities
1. Remove self from all owned entities

#### Delegating permissions
1. Create user A
1. Grant user A scope `prefix/A/any/files`, `prefix/A/any/directories` (do anything with owned files and directories)
1. User A creates user B
1. User A grants B scope `owners/A/write/files`
1. User A is able to create/read/write files and directories, user B can only edit the files owned by user A

#### User groups
##### Via scopes
1. Create user A
1. Create user B
1. Create user G
1. Assign A and B scope `prefix/G/any/any`
1. A and B now can act on entities owned by G or create entities owned by G
1. Remove the scope from A to remove it from the group
