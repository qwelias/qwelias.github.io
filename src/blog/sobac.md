## Scoped Owner Based Access Control
### Key points
- System data entities consist of resources and users which are able to act upon resources
- Every entity has a list of owners
- Every user has a list of scopes
- A scope is defined as `owners/id/action/namespace`, where
  - `owners` is a static prefix, could be useful in future to avoid conflicts with extensions
  - `id` is one of:
    - a user's ID
    - `self` indicating current user's ID
    - `any`
  - `action` either `any` or is a specific action allowed to perform (read, write, list, edit, etc. depeding on business-logic)
  - `namespace` either `any` or entity type name to performe the `action` on

### User logic
- When creating an entity it inherits the list of owners of current user, plus current user
- It is possible to (un)assign owned users from owned entities
- Self owns self
- It is not possible to create ownership loops (if A is owned by B, then B cannot own A)
- It is possible to grant scopes which are a subset of own scopes
- Any aritrary `action`/`namespace` is a subset of `any`

### Example use cases
#### Ownership transfer
1. Create user A
1. Add user A as owner to all owned entities
1. Remove self from all owned resources

#### Delegating permissions
1. Create user A
1. Grant user A scope `owners/self/any/files`, `owners/self/any/directories` (do anything with owned files and directories)
1. User A creates user B
1. User A grants B scope `owners/A/write/files`
1. User A is able to create/read/write files and directories, user B can only edit the files owned by user A

#### User groups
##### Using scopes
1. Create user A
1. Create user B
1. Create user G
1. Assign A and B scopes `owners/G/any/any`
1. A and B now can act on entities owned by G or create entities owned by G
1. Remove the scope from A to remove it from the group
##### Using owner
Could also be done via assigning A and B as owners of G, in which case the ownership of entities created by G will be shared and grant/removal of access will be O(N) instead of O(1)
