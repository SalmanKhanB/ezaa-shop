"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddToCart } from "@/hooks/useProducts";
import {
  useCreateShippingAddress,
  useShippingAddresses,
  useUpdateShippingAddress,
} from "@/hooks/useShipping";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { attachImage, clearCart } from "@/lib/store/slices/cartSlice";
import { ShippingAddressData } from "@/types";
import bankDetails from "@/utils/bankDetails";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "../copy-button";
import { H5, H6 } from "../typography";
import Image from "next/image";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { FaMoneyBillTransfer, FaUser, FaUpload } from "react-icons/fa6";
import { RiBankLine } from "react-icons/ri";
import { BsCloudUpload } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((store) => store.auth);
  const { coupoun_code, coupoun_amount, products, total_amount, image } =
    useAppSelector((store) => store.cart);
  const { id, fname, lname, phone } = user || {};
  const { bank_name, account_title, account_number } = bankDetails;

  const { mutate: addToCart } = useAddToCart();
  const { mutate: createShippingAddress } = useCreateShippingAddress();
  const { mutate: updateShippingAddress } = useUpdateShippingAddress();
  const { data } = useShippingAddresses(id) as any;

  const addresses: ShippingAddressData[] = useMemo(
    () => data?.data?.userShippingAddress || [],
    [data]
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Islamabad");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const activeAddress = addresses.find(
      (address) => address.status === "Active"
    );
    if (activeAddress) {
      setSelectedAddressId(activeAddress?.id?.toString() || null);
      setAddress(activeAddress.shipping_address);
    }
  }, [addresses]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) dispatch(attachImage(file));
  };

  const handleSaveAddress = () => {
    if (!id) return;
    createShippingAddress({
      userId: id,
      data: {
        city_name: city,
        shipping_address: address,
        country_name: "Pakistan",
        status: "Active",
      },
    });

    setDialogOpen(false);
  };

  const handleCheckout = () => {
    if (!image) {
      toast.error("Please upload a payment screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("total_amount", total_amount.toString());
    formData.append("coupoun_code", coupoun_code);
    formData.append("coupoun_amount", coupoun_amount.toString());
    formData.append("phone_number", phone);
    formData.append("shipping_address", address);
    
    // Ensure each product has the required price field
    const productsWithPrice = products.map(product => ({
      ...product,
      price: product.price // Use selling_price as the  price
    }));
    
    formData.append("products", JSON.stringify(productsWithPrice));
    formData.append("image", image);

    addToCart(
      { userId: id, data: formData },
      {
        onSuccess: () => 
        {
          toast.success('Order placed successfully!');
          
          router.push("/orders");
          dispatch(clearCart());
        },
        onError: (error: any) => {
          toast.error('Something went wrong.');
          console.error("Order Error:", error);
        },
      }
    );
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);

    addresses.forEach((address) => {
      const isSelected = address?.id?.toString() === addressId;

      updateShippingAddress({
        addressId: address?.id?.toString() || "",
        data: {
          city_name: address.city_name,
          shipping_address: address.shipping_address,
          country_name: address.country_name,
          status: isSelected ? "Active" : "Inactive",
        },
      });
    });
  };

  const handleRemoveImage = () => {
    dispatch(attachImage(null));
  };

  return (
    <div className="space-y-6 my-10 px-4 max-w-4xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <H5 className="text-green-600 font-medium flex items-center gap-2">
          <span className="text-lg">ℹ️</span>
          The account details are provided below. Please complete the payment
          outside the app and don&apos;t forget to take a screenshot. Thank you!
        </H5>
      </div>

      {/* Bank Details */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-medium text-muted-foreground flex items-center gap-2">
          <RiBankLine size={20} />
          Bank Details
        </H6>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-signature">Bank</Label>
            <H5>{bank_name}</H5>
          </div>
          <div>
            <Label className="text-signature">Account Title</Label>
            <H5>{account_title}</H5>
          </div>
          <div>
            <Label className="text-signature">Account Number</Label>
            <div className="flex items-center gap-2">
              <H5>{account_number}</H5>
              <CopyButton value={account_number} />
            </div>
          </div>
          <div>
            <Label className="text-signature">Total Amount</Label>
            <H5 className="text-foreground font-semibold">Rs {total_amount}</H5>
          </div>
        </div>
      </div>

      {/* User Info + Address */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-semibold text-muted-foreground flex items-center gap-2">
          <FaUser size={18} />
          Your Information
        </H6>

        {/* Display Addresses as Radio Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-signature">Full Name</Label>
            <H5>
              {fname} {lname}
            </H5>
          </div>
          <div>
            <Label className="text-signature">Phone</Label>
            <H5>{phone}</H5>
          </div>

          <div className="md:col-span-2">
            <Label className="text-signature mb-2">Address</Label>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="address"
                    value={address.id}
                    checked={selectedAddressId === address?.id?.toString()}
                    onChange={() =>
                      handleAddressSelect(address?.id?.toString() || "")
                    }
                    className="h-4 w-4"
                  />
                  <Label htmlFor={`address-${address.id}`} className="text-sm">
                    {address.shipping_address}, {address.city_name},{" "}
                    {address.country_name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <MdOutlineAddHomeWork  size={22}/>
              Add new address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Shipping Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSaveAddress}>
                Save Address
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upload Screenshot */}
      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
        <H6 className="font-semibold text-muted-foreground flex items-center gap-2">
          <FaUpload size={18} />
          Upload Payment Screenshot
        </H6>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label 
              htmlFor="file-upload" 
              className="flex-1 cursor-pointer"
            >
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 hover:border-muted-foreground/50 transition-colors">
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <BsCloudUpload size={32} className="text-muted-foreground/70" />
                  {image ? (
                    <>
                      <span className="text-sm font-medium">Click to change image</span>
                      <span className="text-xs text-green-600">Image selected ✓</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Click to upload</span>
                      <span className="text-xs">PNG, JPG or JPEG (MAX. 2MB)</span>
                    </>
                  )}
                </div>
              </div>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {image && (
            <div className="relative w-full aspect-video">
              <Image
                src={URL.createObjectURL(image)}
                alt="Payment Screenshot"
                fill
                className="object-contain rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
              >
                <IoClose size={16} />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleCheckout}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-white"
        disabled={!image}
      >
        <FaMoneyBillTransfer size={18} />
        Submit Payment
      </Button>
    </div>
  );
};

export default Checkout;
