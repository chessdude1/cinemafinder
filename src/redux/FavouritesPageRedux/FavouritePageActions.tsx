export enum CountTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export const FavouritePageActions = {
  Decrement: (): DecrementType => ({ type: CountTypes.DECREMENT }),
  Increment: (): IncrementType => ({ type: CountTypes.INCREMENT }),
};

export interface FavouritePageStateType {
  number : number
}

interface DecrementType {
  type: CountTypes.DECREMENT;
}

interface IncrementType {
  type: CountTypes.INCREMENT;
}

export type FavouritePageActionsType = DecrementType | IncrementType;
