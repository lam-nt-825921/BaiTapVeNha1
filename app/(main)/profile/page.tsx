"use client";

import { useActionState, useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { Button, Input } from "@/components/ui";
import {
    initialProfileState,
    updateProfileAction,
} from "@/features/profile/actions/profileActions";

export default function ProfilePage() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState(() => ({
        name: user?.name ?? "",
        email: user?.email ?? "",
        street: user?.address?.street ?? "",
        suite: user?.address?.suite ?? "",
        city: user?.address?.city ?? "",
        zipcode: user?.address?.zipcode ?? "",
        phone: user?.phone ?? "",
        website: user?.website ?? "",
        companyName: user?.company?.name ?? "",
    }));

    const [state, formAction, isPending] = useActionState(
        updateProfileAction,
        initialProfileState
    );

    useEffect(() => {
        if (state.success && state.profile) {
            setUser(state.profile);
        }
    }, [setUser, state]);

    if (!user) {
        return (
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center text-gray-700 shadow-xl dark:bg-gray-900 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Profile
                </h1>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    You are not logged in. Please log in to view your profile.
                </p>
            </div>
        );
    }

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Hàm để reset formData về giá trị hiện tại của user
    const resetFormData = () => {
        if (user) {
            setFormData({
                name: user.name ?? "",
                email: user.email ?? "",
                street: user.address?.street ?? "",
                suite: user.address?.suite ?? "",
                city: user.address?.city ?? "",
                zipcode: user.address?.zipcode ?? "",
                phone: user.phone ?? "",
                website: user.website ?? "",
                companyName: user.company?.name ?? "",
            });
        }
    };

    const handleEditToggle = () => {
        if (!isEditing) {
            // Khi chuyển sang chế độ edit, reset formData về giá trị hiện tại
            resetFormData();
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-900 sm:p-10">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        View and update your personal information.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditToggle}
                    >
                        {isEditing ? "Cancel" : "Edit profile"}
                    </Button>
                    
                </div>
            </div>

            {/* Status messages */}
            {state.error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    {state.error}
                </div>
            )}
            {state.success && !state.error && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Profile updated successfully.
                </div>
            )}

            {/* Content */}
            {isEditing ? (
                <form action={formAction} className="space-y-6">
                    <input
                        type="hidden"
                        name="currentUser"
                        value={JSON.stringify(user)}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            required
                        />
                        {state.fieldErrors?.name && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {state.fieldErrors.name}
                            </p>
                        )}
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            required
                        />
                        {state.fieldErrors?.email && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {state.fieldErrors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                            label="Street"
                            name="street"
                            value={formData.street}
                            onChange={(e) =>
                                handleChange("street", e.target.value)
                            }
                        />
                        <Input
                            label="Suite"
                            name="suite"
                            value={formData.suite}
                            onChange={(e) =>
                                handleChange("suite", e.target.value)
                            }
                        />
                        <Input
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={(e) =>
                                handleChange("city", e.target.value)
                            }
                        />
                        <Input
                            label="Zip Code"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={(e) =>
                                handleChange("zipcode", e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                handleChange("phone", e.target.value)
                            }
                        />
                        <Input
                            label="Website"
                            name="website"
                            value={formData.website}
                            onChange={(e) =>
                                handleChange("website", e.target.value)
                            }
                        />
                    </div>

                    <Input
                        label="Company"
                        name="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                            handleChange("companyName", e.target.value)
                        }
                    />

                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleEditToggle}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isPending}
                            disabled={isPending}
                        >
                            Save changes
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                        <h2 className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                            Personal
                        </h2>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Name:
                            </span>{" "}
                            {user.name}
                        </p>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Email:
                            </span>{" "}
                            {user.email}
                        </p>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Phone:
                            </span>{" "}
                            {user.phone}
                        </p>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Website:
                            </span>{" "}
                            {user.website}
                        </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                        <h2 className="mb-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                            Address & Company
                        </h2>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Address:
                            </span>{" "}
                            {user.address?.street}, {user.address?.suite},{" "}
                            {user.address?.city} {user.address?.zipcode}
                        </p>
                        <p>
                            <span className="font-medium text-gray-500 dark:text-gray-400">
                                Company:
                            </span>{" "}
                            {user.company?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.company?.catchPhrase}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.company?.bs}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
