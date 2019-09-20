/// <reference types="react" />
import { CarouselInternalState, CarouselProps } from "./types";
interface CarouselItemsProps {
    props: CarouselProps;
    state: CarouselInternalState;
    clones: any[];
    goToSlide: (index: number) => void;
}
declare const CarouselItems: ({ props, state, goToSlide, clones, }: CarouselItemsProps) => JSX.Element | null;
export default CarouselItems;
