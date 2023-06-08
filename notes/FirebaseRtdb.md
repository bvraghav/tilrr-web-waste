
# Table of Contents

1.  [Assume a simple data structure design](#orgbaab070)
2.  [Fundamental Read and Write capabilities](#orgdbc1529)
3.  [Lists of Data](#orgc6e8839)
    1.  [Insert with auto ID](#orgdbd2f8b)
    2.  [Listen to events on lists](#org24dfbfa)
    3.  [Order/ Sort](#orgabf8844)
    4.  [Filter](#org38d90f9)
    5.  [Connection Signal Handling](#org5eeb39d)

**TODO**

Test a simple interaction with Firebase database:   
<https://firebase.google.com/docs/database/web/start>


<a id="orgbaab070"></a>

# Assume a simple data structure design

<https://firebase.google.com/docs/database/web/structure-data>

The aim is to have

-   Modular writes from a single interaction page (with
    write access);
-   Read a whole entity from a single ID.


<a id="orgdbc1529"></a>

# Fundamental Read and Write capabilities

<https://firebase.google.com/docs/database/web/read-and-write>

-   [DB Ref](https://firebase.google.com/docs/database/web/read-and-write#get_a_database_reference)
-   [Write data](https://firebase.google.com/docs/database/web/read-and-write#write_data)
-   [Read data](https://firebase.google.com/docs/database/web/read-and-write#read_data)
-   [Update ops](https://firebase.google.com/docs/database/web/read-and-write#updating_or_deleting_data)
-   **[Transactional ops](https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions)**
    
    Use an idiom as follows for transaction: 
    
        const db = getDatabase()
        const dbItemRef = ref(db, item)
        runTransaction(dbItemRef, (dbItem) => {
          // Do something to the dbItem
          return dbItem
        })
    
    In race conditions (or stale data on client-side), a
    transaction correctly handles the scenarios.  There
    may be a rejection from server, due to a race; in
    such a case, the client would repeat the transaction
    request, until accepted by server or aborted by
    client.
    
    OR,
    
    One as follows for what is called an atomic update:
    
        const dbRef = getDatabase()
        const updates = {
          itemPath: atomicValue,
          // ...
        }
        update(dbRef, updates)
    
    Firebase provides functions like `increment` that can
    communicate simple ops like `i++` as instructions.
    This results in an instruction set that may be
    modularly stacked at the server end, and eliminates
    the need for repeating a transaction request.  Of
    course, this is not always feasible; but where it is,
    it is clearly more efficient.


<a id="orgc6e8839"></a>

# Lists of Data


<a id="orgdbd2f8b"></a>

## Insert with auto ID

Instead of creating **keys** or **IDs** on the client-side,
Firebase provides `push()` API to work with lists, that
can also be used to append to a list with automatic ID.


<a id="org24dfbfa"></a>

## Listen to events on lists

-   **`child_added`:** `onChildAdded(itemRef, (data) =>
      {})`
-   **`child_changed`:** `onChildChanged(itemRef, (data) =>
      {})`
-   **`child_removed`:** `onChildRemoved(itemRef, (data) =>
      {})`
-   **`child_moved`:** `onChildMoved(itemRef, (data) =>
      {})`
-   **`value`:** `onValue(itemRef, (snapshot) => {})`; Loop
    over the entire list!


<a id="orgabf8844"></a>

## Order/ Sort

Use `.indexOn` to [index the data](https://firebase.google.com/docs/database/security/indexing-data).

    {
      "rules": {
        "dinosaurs": {
          ".indexOn": ["height", "length"]
        }
      }
    }

-   **`orderByChild`:** `query(listRef,
      orderByChild(childPath))`; To order by value of
    `childPath` in each element of result;
-   **`orderByKey`:** `query(listRef, orderByKey())`; To
    sort query results in the order of their **key/ID**;
-   **`orderByValue`:** `query(listRef, orderByValue())` To
    order a list of scalar values in ascending order.


<a id="org38d90f9"></a>

## Filter

Use one or combine more than one of:

-   `limitToFirst(N)`
-   `limitToLast(N)`
-   `startAt(val)`
-   `startAfter(val)`
-   `endAt(val)`
-   `endBefore(val)`
-   `equalTo(val)`

E.g. a range may be specified using `startAfter(val)`
and `endBefore(val)`.


<a id="org5eeb39d"></a>

## Connection Signal Handling

Firebase handles connections under the hood.  The
signal handling mentioned here is explicitly to inform
the application state about connection status of a
client.  The use-case scenarios may be like a live-chat
application.  Otherwise, for simple use cases of a
portfolio, or an IO app, this might not be necessary at
all.

-   **Disconnection Signal:** `onDisconnect`
-   **(re)Connection Signal:** const connectedRef = ref(db, ".info/connected")
        onValue(connectedRef, (snap) => {/* */})

