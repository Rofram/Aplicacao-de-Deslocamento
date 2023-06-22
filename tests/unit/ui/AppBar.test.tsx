import { AppBar } from "@/components/ui/AppBar";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../utils/helpers";

describe('AppBar component', () => {
  it('should be able render', () => {
    renderWithTheme(<AppBar />)
    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
  })
})