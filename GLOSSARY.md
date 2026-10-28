# Electro Parts

A personal inventory of the electronic components one person owns, and how many of each.

## Language

**Component**:
A distinct kind of electronic part the owner has, together with how many of it they hold (e.g. "10kΩ resistor, 0805, 1%, qty 200"). One Component per kind of part, not per physical unit. A Component is identified by its name together with its Manufacturer, so the same name from two Manufacturers is two Components. Names and Manufacturers are compared exactly, so "NE555" and "ne555" are two Components.
_Avoid_: Part, item, product

**Quantity**:
How many units of a Component the owner currently holds; a whole number, never negative. A Component with Quantity 0 is **out of stock** but still in the inventory.
_Avoid_: Stock, amount, count

**Manufacturer**:
The company that makes a Component (e.g. "Yageo", "Texas Instruments").
_Avoid_: Brand, vendor, supplier

**Category**:
A named group the owner files Components under (e.g. "Resistors", "Capacitors"). Categories are a flat list: they do not nest. A Component belongs to at most one Category; a Component with none is **uncategorized**. A Category is identified by its name alone, and names are compared exactly, so "Resistors" and "resistors" are two Categories.
_Avoid_: Type, tag, group

**Minimum Quantity**:
The number of units of a Component the owner wants to always have on hand; a whole number, never negative. A Minimum Quantity of 0 means the owner does not track a minimum for that Component.
_Avoid_: Reorder point, threshold, par level

**Low stock**:
A Component whose Quantity is at or below its Minimum Quantity, where the Minimum Quantity is above 0. A Component with Quantity 0 is **out of stock**, which is shown as its own state.

**Adjustment**:
A recorded change to one Component's Quantity: a kind (Purchase or Usage), a number of units (always positive), a date, and a reason. Recording an Adjustment changes the Component's Quantity; the Adjustments are the history of why it changed. A Component's starting Quantity is a baseline, not an Adjustment, and afterwards Quantity changes only through Adjustments. A Usage larger than the current Quantity is not allowed. The date is a calendar day, today by default, and may be in the past but not the future.
_Avoid_: Transaction, movement, stock change

**Purchase**:
An Adjustment that adds units to a Component's Quantity. Its reason is optional.

**Usage**:
An Adjustment that removes units from a Component's Quantity because they were used, e.g. in a project. Its reason is required and is where the project is named; projects are not modelled separately.
_Avoid_: Consumption, withdrawal
