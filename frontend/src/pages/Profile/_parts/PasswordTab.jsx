import React from 'react'
import Input from '../../../components/Input'


export default function PasswordTab({ formData, handleInputChange, errors }) {
    return (
        <div>
            <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword || ""}
                onChange={handleInputChange}
                error={errors.currentPassword ? errors.currentPassword[0] : null}
            />

            <Input
                label="New Password"
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword || ""}
                onChange={handleInputChange}
                error={errors.newPassword ? errors.newPassword[0] : null}
            />

            <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                error={errors.confirmPassword ? errors.confirmPassword[0] : null}
            />

        </div>
    )
}
