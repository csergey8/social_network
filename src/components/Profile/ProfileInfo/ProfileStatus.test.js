import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('Profile Status', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status="Subscribe to basic"/>)
        const instance = component.getInstance();
        expect(instance.status).toBe("Subscribe to basic");
    })
})
