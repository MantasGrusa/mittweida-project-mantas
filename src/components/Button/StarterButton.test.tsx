import {describe, expect, it} from "vitest";
import {render,screen} from "@testing-library/react";
import StarterButton from "./StarterButton.tsx";

describe("StarterButton component", ()=>{
    it('should onclick when pressed', () => {
        render(<StarterButton></StarterButton>)



        expect(screen.queryByText("Start exploring")).toBeInTheDocument();
    });

})