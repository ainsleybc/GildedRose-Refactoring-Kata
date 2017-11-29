# Gilded Rose Refactoring Kata

## Approach

### refactoring setup

- fixed the failing test
- updated the test framework and added coverage tool
- TDD the extraction of the Item class into separate file
- removed the dependency on Item in the Gilded rose tests
- proceeded to write tests until coverage was at 100% in all categories

### refactoring

Writing the test cases gave me an understanding of the flow of the code and what each part did. I could then leverage this to help recognise patterns of similar behaviour and extract these out to DRY our the code.

My general approach was to write a new method, encapsulating some behaviour (without changing the existing code) and ensuring all tests were still passing. If still green, I'd then swap out the existing code for the new method and run the tests again; if green, commit and repeat, otherwise revert the changes and start again.

## Install

```
npm install
```

## Test

```
npm test
```
