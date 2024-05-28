import React from 'react';
import { act, waitFor,render } from '../../testUtils';
import ProjectCoverLayout from '@/components/ProjectCoverLayout';
import { ImagePlaygrondLogo, ImageCarivaLogo, ImageCoverBg } from "@/assets";
import { screen } from '@testing-library/react';

describe('ProjectCoverLayout', () => {
  it('renders children', () => {
    render(
      <ProjectCoverLayout>
        <div>Child Component</div>
      </ProjectCoverLayout>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <ProjectCoverLayout>
        <div>Child Component</div>
      </ProjectCoverLayout>,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
 
});