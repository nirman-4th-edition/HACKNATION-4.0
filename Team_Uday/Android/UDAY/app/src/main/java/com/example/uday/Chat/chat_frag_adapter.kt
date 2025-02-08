package com.example.uday.Chat

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter

class chat_frag_adapter(
    private val context: Chat,
    fm: FragmentManager,
    private val list: ArrayList<Fragment>
) : FragmentPagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    override fun getCount(): Int {
        return list.size // Return the actual size of the fragment list
    }

    override fun getItem(position: Int): Fragment {
        return list[position] // Return the fragment at the given position
    }

    override fun getPageTitle(position: Int): CharSequence? {
        return TAB_TITLES[position] // Return the title for each tab
    }

    companion object {
        val TAB_TITLES = arrayOf("Chats", "Call") // Define titles for all tabs
    }
}
