# Quantity changes only through Adjustments

A Component's Quantity is set when it is created and is read-only afterwards; from then on it changes only by recording an Adjustment, in the same database transaction that checks the Quantity stays non-negative. We chose this over free editing so the Adjustment history can never drift from the real Quantity. Adjustments are immutable: the app offers no edit or delete, and a mistake is fixed with a new Adjustment (or directly in the database).

## Considered Options

- **Quantity stays freely editable alongside Adjustments**: simpler UI, but the history and the number would disagree as soon as someone edits Quantity directly.
- **Derive Quantity as a sum of Adjustments (starting Quantity as a Purchase)**: no drift by construction, but rejected to keep the starting Quantity a plain baseline and the Components table cheap to read.

## Consequences

- Deleting a Component deletes its Adjustments.
- Existing Components keep their current Quantity as the baseline.
