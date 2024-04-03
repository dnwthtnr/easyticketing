// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	
	
	declare type Item = import("svelte-dnd-action").Item;
	declare type DndEvent<ItemType = Item> = import('svelte-dnd-action').DndEvent<ItemType>;
	declare namespace svelte.jsx {
		interface HTMLAttributes<T> {
			onconsider?: (event: CustomEvent<DndEvent<ItemType> & {target: EventTarget & T}) => void;
			onfinalize?: (event: CustomEvent<DndEvent<ItemType> & {target: EventTarget & T}) => void;
		}
	}

	
	namespace App {
		interface Locals {
			user: null | {}
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}




export {};
