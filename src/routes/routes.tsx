import { RouteObject } from "react-router-dom"
import { lazy } from "react"
// import Payment from "@smpm/pages/Payment"

export const GuestLayout = lazy(() => import("@smpm/components/guestLayout"))
export const SignIn = lazy(() => import("@smpm/pages/SignIn"))
export const Home = lazy(() => import("@smpm/pages/Home"))
export const Dashboard = lazy(() => import("@smpm/pages/Dashboard"))
export const Report = lazy(() => import("@smpm/pages/Report"))
export const Region = lazy(() => import("@smpm/pages/Region/Index"))
export const MerchantList = lazy(() => import("@smpm/pages/Merchant/Index"))
export const Role = lazy(() => import("@smpm/pages/Role/Index"))
export const User = lazy(() => import("@smpm/pages/User/Index"))
export const Vendor = lazy(() => import("@smpm/pages/Vendor/Index"))
export const Maintenance = lazy(() => import("@smpm/pages/maintenance/Index"))
export const Approve = lazy(() => import("@smpm/pages/Approve/index")) 
export const AuditTrail = lazy(() => import("@smpm/pages/AuthenticationLogs/index"))
export const Payment = lazy(() => import("@smpm/pages/Payment/index"))



export const routes: RouteObject[] = [
	{
		path: "*",
		Component: lazy(() => import("@smpm/pages/Error404")),
	},
	{
		path: "auth",
		element: <GuestLayout />,
		children: [
			{
				path: "sign-in",
				element: <SignIn />,
			},
		],
	},
	{
		path: "/",
		Component: lazy(() => import("@smpm/components/adminLayout")),
		children: [
			{
				path: "home",
				element: <Home />,
			},
			{
				path: "form",
				Component: lazy(() => import("@smpm/pages/Form")),
			},
			{  
				path: "job-order/timeline/:jobOrderNo",  
				Component: lazy(() => import("@smpm/pages/Timeline/TimelinePage")),  
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{  
				path: "add-data",  
				Component: lazy(() => import("@smpm/pages/DocMerchant/AddNewDocumentMerchant")),  
			},
			{  
				path: "add-data-vendor",  
				Component: lazy(() => import("@smpm/pages/DocVendor/AddNewDocumentVendor")),  
			},
			{
				path: "inventory",
				children: [
					{
						path: "warehouse-edc",
						Component: lazy(() => import("@smpm/pages/WarehouseEDC")),
					},
					{
						path: "attached-edc",
						Component: lazy(() => import("@smpm/pages/AttachedEDC")),
					},
					{
                        path: "available-edc",
                        Component: lazy(() => import("@smpm/pages/AvailableEDC")),
                    },
					{
						path: "receive-in",
						Component: lazy(() => import("@smpm/pages/ReceiveIn")),
					},
					{
						path: "receive-out",
						Component: lazy(() => import("@smpm/pages/ReceiveOut")),
					},
					{
						path: "warehouse-edc/add",
						Component: lazy(() => import("@smpm/pages/WarehouseEDC/Add")),
					},
				],
			},
			{  
				path: "approve",  
				element: <Approve />,  
			},
			// {
			// 	path: 'dashboard',
			// 	element: <Dashboard />
			// },
			{
				path: "menu-management",
				children: [
					{ path: "role", element: <Role /> },
					{ path: "user", element: <User /> },
					{ path: "region", element: <Region /> },
					{ path: "vendor", element: <Vendor /> },
				],
			},
			{
				path: "report",
				element: <Report />,
			},
			{
				path: "payment",
				element: <Payment />,
			},
			{  
				path: 'payment/unknown/:id',  
				Component: lazy(() => import('@smpm/pages/Payment/PaymentInvoice')),  
			},  
			{
				path: "job-order",
				children: [
					{
						path: "open",
						Component: lazy(() => import("@smpm/pages/OpenJobOrder/Index")),
					},
					{
						path: "activity",
						Component: lazy(() => import("@smpm/pages/ActivityJobOrder/Index")),
					},
					{
						path: "activityvendor",
						Component: lazy(() => import("@smpm/pages/ActivityVendor/Index")),
					},
					{
						path: "results",
						Component: lazy(() => import("@smpm/pages/Results/Index")),
					},
					{
						path: "activity/:no_jo",
						Component: lazy(() => import("@smpm/pages/JobOrderActivity")),
					},
					// {
					// 	path: "preventive-maintenance",
					// 	element: <JobOrderPreventiveMaintenance />,
					// },
				],
			},
			{
				path: "merchant",
				children: [
					{
						path: "list-merchant",
						element: <MerchantList />,
					},
					{
						path: "list-merchant/add",
						Component: lazy(() => import("@smpm/pages/Merchant/Add")),
					},
					{
						path: "list-merchant/edit/:id",
						Component: lazy(() => import("@smpm/pages/Merchant/Edit")),
					},
					{  
						path: "maintenance-merchant",  
						element: <Maintenance />,  
					},
				],
			},
			{
				path: "Document",
				children: [
					{
						path: "DocMerchant",
						Component: lazy(() => import("@smpm/pages/DocMerchant/index")),
					},
					{
						path: "DocVendor",
						Component: lazy(() => import("@smpm/pages/DocVendor")),
					},
				],
			},
			{
				path: "Audit",
				children: [
					{
						path: "authlogs",
						Component: lazy(() => import("@smpm/pages/AuthenticationLogs/index")),
					},
					{
						path: "syslogs",
						Component: lazy(() => import("@smpm/pages/SystemLogs/index")),
					},
				],
			},
			// {
			// 	path: "inventory",
			// 	children: [
			// 		{
			// 			path: "warehouse-edc",
			// 			element: <WarehouseEdc />,
			// 		},
			// 		{
			// 			path: "installed-edc",
			// 			element: <InstalledEdc />,
			// 		},
			// 		{
			// 			path: "receive-in",
			// 			element: <ReceiveIn />,
			// 		},
			// 		{
			// 			path: "receive-out",
			// 			element: <ReceiveOut />,
			// 		},
			// 	],
			// },
		],
	},
]
