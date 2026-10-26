# Electro Parts

A personal inventory of the electronic components one person owns, and how many of each.

## Language

**Component**:
A distinct kind of electronic part the owner has, together with how many of it they hold (e.g. "10kΩ resistor, 0805, 1%, qty 200"). One Component per kind of part, not per physical unit. A Component is identified by its name together with its Manufacturer, so the same name from two Manufacturers is two Components.
_Avoid_: Part, item, product

**Quantity**:
How many units of a Component the owner currently holds; a whole number, never negative. A Component with Quantity 0 is **out of stock** but still in the inventory.
_Avoid_: Stock, amount, count

**Manufacturer**:
The company that makes a Component (e.g. "Yageo", "Texas Instruments").
_Avoid_: Brand, vendor, supplier
