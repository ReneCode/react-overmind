# React app using overmind for state management

## using createModals

I clone codesandbox-client and took the "createModals" code.

in src/overmind/index I used that createModals.

## typescript error

in src/App.tsx I want to call the open action of the editPageModal.

    actions.modals.editPageModal.open();

but I got an typescript error:

Failed to compile.

/Users/rene/work/epl/react-overmind/src/App.tsx
TypeScript error in /Users/rene/work/epl/react-overmind/src/App.tsx(10,13):
Property 'modals' does not exist on type '{}'. TS2339
