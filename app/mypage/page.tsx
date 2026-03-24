import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        include: {
          orderItems: {
            include: { product: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <h1 className="text-4xl font-black text-black tracking-widest border-b-4 border-black pb-4 inline-block">MY PAGE</h1>
        
        <div className="bg-white p-8 shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center"><i className="ri-user-line mr-2"></i> Profile Information</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md"><span className="text-gray-500 w-24 inline-block font-medium">Name</span> <span className="font-bold">{user?.name}</span></div>
            <div className="bg-gray-50 p-4 rounded-md"><span className="text-gray-500 w-24 inline-block font-medium">Email</span> <span className="font-bold">{user?.email}</span></div>
            <div className="bg-gray-50 p-4 rounded-md"><span className="text-gray-500 w-24 inline-block font-medium">Role</span> <span className="font-bold text-red-600">{user?.role}</span></div>
          </div>
        </div>

        <div className="bg-white p-8 shadow-md border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center"><i className="ri-shopping-bag-line mr-2"></i> Order History</h2>
          {!user?.orders || user.orders.length === 0 ? (
             <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">You have no orders yet.</p>
                <a href="/" className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-gray-800 transition-colors">START SHOPPING</a>
             </div>
          ) : (
            <div className="space-y-6">
              {user.orders.map(order => (
                <div key={order.id} className="border border-gray-200 p-6 hover:border-black transition-colors">
                  <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                    <span className="font-bold text-sm tracking-wider">ORDER #{order.id.slice(-8).toUpperCase()}</span>
                    <span className="text-sm font-medium text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="space-y-3">
                    {order.orderItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3">
                        <span className="text-sm font-medium text-gray-800">{item.product.name} <span className="text-gray-400">x {item.quantity}</span></span>
                        <span className="font-bold text-sm">₩{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-500">Status: <span className="text-green-600 uppercase tracking-widest ml-2 bg-green-50 px-2 py-1">{order.status}</span></span>
                    <span className="font-black text-xl">Total: ₩{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
