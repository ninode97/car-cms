import React from 'react'

const DataTable = () => {
    return (
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow-md sm:rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Plate
              </th>
              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Brand
              </th>
              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Category
              </th>
              <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                Price
              </th>
              <th scope="col" className="relative py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Product 1 */}
            <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Sliver
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Laptop
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                $2999
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
              </td>
            </tr>
            {/* Product 2 */}
            <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple Imac 27"
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                White
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Desktop Pc
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                $1999
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
              </td>
            </tr>
            {/* Product 3 */}
            <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                iPhone 13 Pro 
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                White
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Phone
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                $999
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
              </td>
            </tr>
            {/* Product 4 */}
            <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple Magic Mouse 2
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                White
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Accessories
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                $99
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
              </td>
            </tr>
            {/* Product 5 */}
            <tr className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple Watch Series 7
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Pink
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                Accessories
              </td>
              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                $599
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    )
}

export default DataTable
